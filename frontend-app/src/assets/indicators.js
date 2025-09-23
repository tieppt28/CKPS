function indicators(ticker) {
  const win = document.getElementById('ifr2').contentWindow;
  win.postMessage(ticker, 'https://www.finbox.vn');
}
