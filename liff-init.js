window.LIFF_ID = "2009794956-63RNhOU2";

liff.init({ liffId: window.LIFF_ID })
  .then(() => {
    console.log("LIFF 初始化成功");
    if (!liff.isLoggedIn()) {
      liff.login();
    } else {
      window.dispatchEvent(new CustomEvent('liff-ready'));
    }
  })
  .catch(err => {
    console.error("LIFF 初始化失敗", err);
    alert("LINE 初始化失敗，請確認網路連線後重新整理");
  });
