var brandsUrl = "http://carshop-api.azurewebsites.net/api/filter/makers";

function parser() {
  var baseUrl = "http://www.carlogos.org/logo/";
  var urls = [];
  var notWorking = [];

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);


      var jsonData = data;
      for (var i = 0; i < jsonData.length; i++) {
        var _url = baseUrl + jsonData[i].name + "-logo.png";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            urls.push(_url);
          }
          else {
            notWorking.push(_url);
          }
          if (i === jsonData[i] - 1) {
            console.log("-------------------------- \n Working urls: ");
            console.log(urls);
            console.log("\n ----------------- \n NOT WORKING:");
            console.log(notWorking);

            console.log("-------------------------- \n Working urls: ");
            console.log(JSON.stringify(urls));
            console.log("\n ----------------- \n NOT WORKING:");
            console.log(JSON.stringify(notWorking));
          }
        };
        xhttp.open("GET", _url, true);
        xhttp.send();
      }
    }
  };
  xmlhttp.open("GET", brandsUrl, true);
  xmlhttp.send();
}

parser();
