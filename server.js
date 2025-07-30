const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;

const server = http.createServer((req, res) => {
  // Simple static file server
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // Create a simple HTML page if no file exists
  if (filePath === '/index.html') {
    const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ほか弁当 - 美味しいお弁当をお届け</title>
    <style>
        body {
            font-family: 'Hiragino Sans', 'Yu Gothic', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }
        .header {
            background: linear-gradient(to right, #dc2626, #b91c1c);
            color: white;
            padding: 1rem 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-size: 2rem;
            font-weight: bold;
        }
        .badge {
            background: #fbbf24;
            color: #92400e;
            padding: 0.25rem 0.5rem;
            border-radius: 1rem;
            font-size: 0.875rem;
            font-weight: 600;
            margin-left: 1rem;
        }
        .nav {
            display: flex;
            gap: 2rem;
        }
        .nav a {
            color: white;
            text-decoration: none;
            transition: color 0.3s;
        }
        .nav a:hover {
            color: #fbbf24;
        }
        .recommend-banner {
            background: #fbbf24;
            color: #92400e;
            padding: 0.75rem 0;
            text-align: center;
            font-weight: bold;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        .main {
            padding: 3rem 0;
        }
        .hero {
            background: white;
            border-radius: 1rem;
            padding: 3rem;
            margin-bottom: 3rem;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .hero h1 {
            color: #b91c1c;
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        .hero p {
            color: #6b7280;
            font-size: 1.125rem;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        .buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-block;
        }
        .btn-primary {
            background: #dc2626;
            color: white;
        }
        .btn-primary:hover {
            background: #b91c1c;
            transform: translateY(-2px);
        }
        .btn-secondary {
            background: #fbbf24;
            color: #92400e;
        }
        .btn-secondary:hover {
            background: #f59e0b;
            transform: translateY(-2px);
        }
        .menu-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        .menu-card {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .menu-card:hover {
            transform: translateY(-5px);
        }
        .menu-card h3 {
            color: #b91c1c;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        .menu-card .price {
            color: #dc2626;
            font-size: 1.25rem;
            font-weight: bold;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        .feature {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        .feature h4 {
            color: #b91c1c;
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }
        .status {
            background: #10b981;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin: 2rem 0;
            text-align: center;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div>
                    <span class="logo">ほか弁当</span>
                    <span class="badge">毎日手作り</span>
                </div>
                <nav class="nav">
                    <a href="/">ホーム</a>
                    <a href="/menu">メニュー</a>
                    <a href="/about">店舗情報</a>
                    <a href="/contact">お問い合わせ</a>
                </nav>
            </div>
        </div>
        <div class="recommend-banner">
            🔥 本日のおすすめ: 特製から揚げ弁当 ¥590 → 詳細を見る
        </div>
    </header>

    <main class="main">
        <div class="container">
            <div class="status">
                ✅ サーバーが正常に動作しています！ポート8080でアクセス可能です。
            </div>
            
            <section class="hero">
                <h1>🍱 ほっかほかの美味しいお弁当 🍱</h1>
                <p>
                    毎日手作りの温かいお弁当と定食を提供しています。<br>
                    新鮮な食材を使用し、心を込めて調理いたします。
                </p>
                <div class="buttons">
                    <a href="/menu" class="btn btn-primary">メニューを見る</a>
                    <a href="/contact" class="btn btn-secondary">お問い合わせ</a>
                </div>
            </section>

            <section>
                <h2 style="text-align: center; color: #b91c1c; font-size: 2rem; margin-bottom: 2rem;">
                    🔥 人気メニュー
                </h2>
                <div class="menu-grid">
                    <div class="menu-card">
                        <h3>特製から揚げ弁当</h3>
                        <p>ジューシーなから揚げがメインの人気No.1弁当</p>
                        <div class="price">¥590</div>
                        <span style="background: #f59e0b; color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">おすすめ</span>
                    </div>
                    <div class="menu-card">
                        <h3>チキン南蛮定食</h3>
                        <p>タルタルソースたっぷりのチキン南蛮定食</p>
                        <div class="price">¥750</div>
                        <span style="background: #dc2626; color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">NEW</span>
                    </div>
                    <div class="menu-card">
                        <h3>海鮮丼</h3>
                        <p>新鮮な海の幸をたっぷり乗せた海鮮丼</p>
                        <div class="price">¥850</div>
                        <span style="background: #3b82f6; color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">人気</span>
                    </div>
                    <div class="menu-card">
                        <h3>ハンバーグ弁当</h3>
                        <p>手作りハンバーグの定番弁当</p>
                        <div class="price">¥650</div>
                        <span style="background: #3b82f6; color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">人気</span>
                    </div>
                </div>
            </section>

            <section class="features">
                <div class="feature">
                    <div class="feature-icon">🍚</div>
                    <h4>毎日手作り</h4>
                    <p>新鮮な食材を使用し、毎日心を込めて手作りしています。</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">🚚</div>
                    <h4>配達対応</h4>
                    <p>ご注文いただければ、温かいお弁当をお届けします。</p>
                </div>
                <div class="feature">
                    <div class="feature-icon">💰</div>
                    <h4>リーズナブル</h4>
                    <p>美味しくて栄養バランスの良いお弁当をお手頃価格で。</p>
                </div>
            </section>

            <div style="text-align: center; margin-top: 3rem;">
                <a href="/admin" class="btn" style="background: #6b7280; color: white;">管理者ページ</a>
            </div>
        </div>
    </main>
</body>
</html>`;
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }
  
  // Handle other routes
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html>
      <head><title>404 - Page Not Found</title></head>
      <body style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1>404 - ページが見つかりません</h1>
        <p><a href="/">ホームページに戻る</a></p>
      </body>
    </html>
  `);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`✅ サーバーが起動しました！`);
  console.log(`🌐 http://localhost:${port} でアクセスできます`);
  console.log(`🌐 http://127.0.0.1:${port} でもアクセスできます`);
});