const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/d0e4e4a125a74088b509934096195d0d"
  )
);
document.getElementById("createNewAccount").addEventListener(
  "click",
  function() {
    let password = document.getElementById("enterPassword").value;
    if (password === "") {
      alert("Please input password!");
    } else {
      let account = web3.eth.accounts.create();
      let keystore = web3.eth.accounts.encrypt(account.privateKey, password);
      console.log(keystore);
      let blob = new Blob([JSON.stringify(keystore)], {
        type: "application/json"
      });
      let url = URL.createObjectURL(blob);
      console.log(url);
      document.getElementById("download").href = url;
      document.getElementById("continue").disabled = false;
      document.getElementById("card-download").style.display = "block";
      document.getElementById("card-CreateAccount").style.display = "none";
    }
  },
  false
);

document.getElementById("continue").addEventListener(
  "click",
  function() {
    document.getElementById("card-SavePrivateKey").style.display = "block";
    document.getElementById("card-download").style.display = "none";
  },
  false
);

document.getElementById("unlockWithKey").addEventListener("click", function() {
  let privateKey = document.getElementById("inputKey").value;
  console.log(privateKey);
  if (!privateKey.match(/^[0-9A-Fa-f]{64}$/)) {
    alert("Enter the private key.");
  } else {
    console.log(privateKey);
    let account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
    console.log(account);
    const td = document.getElementsByTagName('td');
    console.log(account.address);
    document.querySelector('#yourAddress td').textContent = account.address;
    document.querySelector('#yourPrivateKey td').textContent = account.privateKey;
    web3.eth.getBalance(account.address).then((balance) => {
      document.querySelector('#yourBalance td').textContent = balance;
    });
  }
});
