window.LIFF_ID = "2009794956-63RNhOU2";

// 宣告一個全域 Promise，讓遊戲主程式可以等待 LIFF 初始化完成
window.liffReady = new Promise((resolve, reject) => {
    liff.init({ liffId: window.LIFF_ID })
        .then(() => {
            console.log("✅ LIFF 初始化成功");
            
            // 檢查是否已登入
            if (!liff.isLoggedIn()) {
                console.log("⚠️ 未登入 LINE，準備跳轉登入");
                // 未登入則強制登入
                liff.login();
            } else {
                console.log("✅ 已登入 LINE");
                // 已登入，取得使用者資料並觸發事件
                liff.getProfile().then(profile => {
                    console.log("✅ 取得使用者資料:", profile.userId);
                    window.lineUserId = profile.userId;
                    window.lineDisplayName = profile.displayName;
                    // 觸發自訂事件，通知遊戲主程式 LIFF 已就緒
                    window.dispatchEvent(new CustomEvent('liff-ready', { detail: profile }));
                    resolve(profile);
                }).catch(err => {
                    console.error("❌ 取得使用者資料失敗", err);
                    reject(err);
                });
            }
        })
        .catch(err => {
            console.error("❌ LIFF 初始化失敗", err);
            alert("LINE 初始化失敗，請確認網路連線後重新整理");
            reject(err);
        });
});

// 監聽 LIFF 登入後的網址變化（處理 redirect 回來的狀況）
if (liff.isLoggedIn()) {
    console.log("✅ LIFF 已登入狀態");
}
