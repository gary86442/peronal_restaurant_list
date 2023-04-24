# 餐廳清單 3.0

使用者申請帳號並自行記錄餐廳資訊，亦可用 Facebook 或是 Google 帳號來進行註冊

## 專案畫面

![image](https://github.com/gary86442/personal_restaurant_list/blob/main/public/img/index.png)

![image](https://github.com/gary86442/personal_restaurant_list/blob/main/public/img/login.png)

## 功能列表

- 註冊帳號:可以連結 Facebook，Google 來註冊，或是直接使用 email 註冊帳號。
- 點選新增餐廳以新增餐廳資訊
- 點選:information_source: 檢視餐廳詳細資訊(包含類別、地址、電話、評分、圖片及 Google Map)
- 點選 ✏️ 編輯此筆餐廳資料
- 點選 🗑️ 刪除此筆餐廳資料
- 依照餐廳名稱及餐廳類別搜尋

## 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/gary86442/personal_restaurant_list.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd personal_restaurant_list
```

3. 安裝 npm 套件

在 Terminal 輸入

```
 npm install
```

4. 填寫環境變數

在資料夾中，找到.env.example，其中變數套用個人之變數。

5. 匯入種子檔案

在 Terminal 執行 Seeder.js 檔案， 匯入使用者與餐廳資料

```

npm run seed
```

當 terminal 出現以下字樣，即表示種子資料已新增至資料庫。

> Mongodb is connected!

> seeder done!!

6. 啟動伺服器，執行 app.js 檔案

```
npm run start
```

7. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

> The Express server is running on http://localhost:3000

> Mongodb is connected!

現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始使用。

8. 以測試帳號或註冊帳號來使用網站，

> 帳號：user1@example.com
> 密碼：12345678

## 使用套件及工具

    "bcryptjs": "^2.4.3",
    "connect-flash": "^0.1.1",
    "express": "^4.18.2",
    "express-handlebars": "^7.0.2",
    "express-session": "^1.17.3",
    "method-override": "^3.0.0",
    "mongoose": "^7.0.1",
    "passport": "^0.6.0",
    "passport-facebook": "^3.0.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-local": "^1.0.0"

## 開發者

> [Gary](https://github.com/gary86442)
