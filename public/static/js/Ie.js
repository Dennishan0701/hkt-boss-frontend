var browser = navigator.appName;
var b_version = navigator.appVersion;
var version = b_version.split(";");
var trim_Version = version[1].replace(/[ ]/g, "");
if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
  window.location.href = './upgrade.html'
} else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
  window.location.href = './upgrade.html';
} else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
  window.location.href = './upgrade.html'
} else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
  window.location.href = './upgrade.html'
}

// function goPAGE() {
//   if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
//     window.location.href = "./mobile"
//   }
// }
// goPAGE();
