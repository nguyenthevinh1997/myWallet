const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/d0e4e4a125a74088b509934096195d0d"));
console.log("web3");
document.getElementById("createNewAccount").addEventListener("click",function(){
  let password = document.getElementById("enterPassword").value;
  if(password ===""){
    alert("Please input password!");
  }
  else{
    let account = web3.eth.accounts.create();
    let keystore = web3.eth.accounts.encrypt(account.privateKey, password);
    console.log(keystore);
    let blob = new Blob([JSON.stringify(keystore)], { "type" : "application/json" });
    let url = URL.createObjectURL(blob);
    console.log(url);
    document.getElementById("download").href = url;
    document.getElementById('continue').disabled = false;
  }
},false);