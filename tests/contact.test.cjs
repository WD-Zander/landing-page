const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const handler = require('../api/contact.js');
const originalFetch = global.fetch;
after(() => { global.fetch = originalFetch; });
const consent = 'Autorizo a ASSET a contactarme por WhatsApp para atender esta solicitud';
const valid = { nombre: 'Prueba local ASSET', telefono: '+12025550123', email: '', empresa: 'Ejemplo', plan: 'Esencial', interes: 'La plataforma ASSET', mensaje: 'Solo simulación local', autorizacion_contacto: consent, _honey: '' };
async function invoke({body = valid, method = 'POST', headers = {}} = {}) {
  const req = {method, body, headers: {'content-type':'application/json', accept:'application/json', origin:'https://getsmcaf.com', ...headers}};
  const res = {headers: {}, setHeader(name,value){this.headers[name]=value;}, status(value){this.statusCode=value;return this;}, json(value){this.body=value;return this;}, send(value){this.body=value;return this;}};
  await handler(req,res);
  return res;
}

test('confirmed provider response delivers only approved fields to the fixed recipient', async()=>{
  let sent;
  global.fetch = async(url,options)=>{
    sent={url,options,body:JSON.parse(options.body)};
    return new Response(JSON.stringify({success:'true'}));
  };
  const result = await invoke({body:{...valid,nombre:' Prueba local ASSET ', telefono:'+1 (202) 555-0123', email:'test@example.com',_cc:'unwanted@example.com', _webhook:'https://unwanted.example', _subject:'replace', whatsapp_contacto:'https://unwanted.example'}});
  assert.equal(result.statusCode,200);
  assert.equal(result.body.success,true);
  assert.equal(result.headers['Cache-Control'],'no-store');
  assert.equal(sent.url,'https://formsubmit.co/ajax/Zanderjosue05@gmail.com');
  assert.equal(sent.body.nombre,'Prueba local ASSET');
  assert.equal(sent.body.telefono,'+12025550123');
  assert.equal(sent.body.whatsapp_contacto,'https://wa.me/12025550123');
  assert.equal(sent.body.email,'test@example.com');
  assert.equal(sent.body._subject,'Nueva solicitud de contacto — ASSET');
  assert.equal(sent.body._url,'https://getsmcaf.com/');
  assert.equal(sent.body._cc,undefined);
  assert.equal(sent.body._webhook,undefined);
  assert.equal(sent.options.redirect,'error');
});

test('rejects invalid input before contacting the provider', async()=>{
  let requests=0;
  global.fetch = async()=>{requests++;throw new Error('Must not send');};
  for(const body of [null,[], 'broken json', {...valid,nombre:' '},{...valid,telefono:'04121234567'}, {...valid,telefono:'+0123456789'}, {...valid,email:'not-an-email'}, {...valid,autorizacion_contacto:''}, {...valid,_honey:'spam'}, {...valid,nombre:['array']}, {...valid,mensaje:'x'.repeat(3001)}]) {
    assert.equal((await invoke({body})).statusCode,400);
  }
  assert.equal((await invoke({body:{...valid,unknown:'x'.repeat(17000)}})).statusCode,413);
  assert.equal((await invoke({headers:{'content-length':'17000'}})).statusCode,413);
  assert.equal((await invoke({headers:{origin:'https://unrelated.example'}})).statusCode,403);
  assert.equal((await invoke({headers:{'content-type':'text/plain'}})).statusCode,415);
  const get=await invoke({method:'GET'});
  assert.equal(get.statusCode,405);
  assert.equal(get.headers.Allow,'POST');
  assert.equal(requests,0);
});

test('distinguishes rejection, HTTP failure, throttling, DNS failure and bad responses without retrying', async()=>{
  const cases = [
    [()=>new Response(JSON.stringify({success:false})),502,'rejected'],
    [()=>new Response('unavailable',{status:503}),502,'unavailable'],
    [()=>new Response('rate limit',{status:429}),429,'rate_limited'],
    [()=>{throw new TypeError('DNS failed');},502,'unavailable'],
    [()=>new Response('<html>Bad gateway</html>'),502,'unavailable'],
  ];
  for(const [response,status,code] of cases){
    let requests=0;
    global.fetch=async()=>{requests++;return response();};
    const result=await invoke();
    assert.equal(result.statusCode,status);
    assert.equal(result.body.success,false);
    assert.equal(result.body.code,code);
    assert.equal(requests,1);
    assert.equal(JSON.stringify(result.body).includes(valid.telefono),false);
  }
});

test('provider timeout stops waiting without retrying or confirming success', async()=>{
  const originalTimeout=global.setTimeout;
  global.setTimeout=(fn,ms,...args)=>originalTimeout(fn,ms===20000?10:ms,...args);
  global.fetch=async(url,options)=>new Promise((resolve,reject)=>options.signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError'))));
  try{
    const result=await invoke();
    assert.equal(result.statusCode,504);
    assert.equal(result.body.code,'timeout');
    assert.equal(result.body.success,false);
  }finally{global.setTimeout=originalTimeout;}
});

test('native form uses the same endpoint and safely preserves fields on failure', async()=>{
  global.fetch=async()=>new Response('unavailable',{status:503});
  const body=new URLSearchParams({...valid,nombre:'<script>alert("x")</script>',mensaje:'" onfocus="alert(1)'}).toString();
  const result=await invoke({body,headers:{accept:'text/html','content-type':'application/x-www-form-urlencoded'}});
  assert.equal(result.statusCode,502);
  assert.match(result.body,/action="\/api\/contact"/);
  assert.match(result.body,/Reintentar envío/);
  assert.match(result.body,/name="telefono" value="\+12025550123"/);
  assert.match(result.body,/&lt;script&gt;/);
  assert.doesNotMatch(result.body,/<script>/);
  assert.match(result.body,/&quot; onfocus=&quot;/);
  assert.equal(result.headers['Cache-Control'],'no-store');
  assert.match(result.headers['Content-Security-Policy'],/form-action 'self'/);
  global.fetch=async()=>new Response(JSON.stringify({success:true}));
  const success=await invoke({headers:{accept:'text/html'}});
  assert.equal(success.statusCode,200);
  assert.match(success.body,/Tu solicitud ya está enviada/);
  assert.doesNotMatch(success.body,/Reintentar envío/);
});
