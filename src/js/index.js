let keyObj;
let href;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/d0e4e4a125a74088b509934096195d0d"
  )
);
$(document).ready(function() {
  $("ul li a").click(function() {
    // $("li a").removeClass("active");
    // $(this).addClass("active");
    if(this.id ==="pills-createAccount"&& href===true){
      $("#viewWallet").hide();
      $("#createAccount").removeClass("fade");
    }
    if(this.id ==="pills-importAccount"&& href===true){
      $("#importAccount").hide();
      $("#viewWallet").show();
    }
  });
});
document.getElementById("createNewAccount").addEventListener(
  "click",
  function() {
    let password = document.getElementById("enterPassword").value;
    if (password === "") {
      alert("Please input password!");
    } else {
      let account = web3.eth.accounts.create();
      let keystore = web3.eth.accounts.encrypt(account.privateKey, password);
      document.querySelector("#yourPrivateKey").textContent =
        account.privateKey;
      console.log(account.privateKey);
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
    let account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
    importAccount(account);
  }
});
document
  .getElementById("inputKeystore")
  .addEventListener("change", function(e) {
    const file = e.target.files[0];
    e.target.nextElementSibling.textContent = file.name;
    var reader = new FileReader();
    reader.addEventListener("load", () => {
      try {
        keyObj = JSON.parse(reader.result);
        console.log(keyObj);
      } catch (error) {
        alert("Please Enter Right Keystore");
      }
    });
    reader.readAsText(file);
  });
document
  .getElementById("unlockWithKeystore")
  .addEventListener("click", function() {
    let password = document.getElementById("enterYourPassword").value;
    if (password === "") {
      alert("Please Enter Password!");
    } else {
      try {
       account = web3.eth.accounts.decrypt(keyObj, password);
       importAccount(account);
      } catch (error) {
        alert(error.message);
      }
    }
  });
function importAccount(account) {
  document.querySelector("#yourAddress td").textContent = account.address;
  document.querySelector("#yourPrivateKey td").textContent = account.privateKey;
  web3.eth.getBalance(account.address).then(balance => {
    document.querySelector("#yourBalance td").textContent = web3.utils.fromWei(
      balance,
      "ether"
    );
    //$("#viewWallet").show();
    $("#importAccount").hide();
    $('#viewWallet').tab('show');
    href = true;
    const etherTag = document.createElement("strong");
    etherTag.appendChild(document.createTextNode("ETH"));
    document.querySelector("#yourBalance td").appendChild(etherTag);
  });
}
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
document
  .getElementById("saveYourAddress")
  .addEventListener("click", function() {
    window.location.href = 'index.html';
    console.log("")
  });