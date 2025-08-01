---
title: Jekyll er drama!
tags: random

---

# **Jekyll on GitHub: Ei Mindf*ck Ta Ki R Bhai!**  

Oi bhai, tumi jodi **GitHub Pages** diye ekta personal website banate chao, ar **Jekyll** use korte giye matha noshto kore felse, then welcome to the club! Amar moto ekta **"tech-savvy"** (nijeke ei title diye vhalai) manusher o matha ghure gechilo ei Jekyll niye. Kintu chill, ami ekhon thik moto bujhtesi—ar tumio parbe inshallah!  

## **Jekyll Ki Ar Ki Kore?**  
Jekyll ekta **static site generator**. Matlab, tumi markdown e likhba, Jekyll seta theke HTML, CSS diye ekta full website baniye dibe. GitHub Pages e host korle **FREE**. Kintu ei jinish ta jemon easy sound kore, temon **"WTF is happening?"** moment onek ashe.  

## **Prothom Prohor: Setup er Nightmare**  
1. **Ruby & Bundler**: Jekyll Ruby te likha. Tai **Ruby install** korte hobe. Windows e? **Good luck, bro.** Mac/Linux e beshi suffer korba na, kintu Windows e **"Could not locate Gemfile"** error er sathe bondhutto hobei.  
2. **Theme Install**: GitHub e ekta Jekyll theme khoja, clone mara, `bundle install` kora—kintu **dependency error**! Arre bhai, **"You need webrick"** bolte matha kharap kore na? (`bundle add webrick` dilei hoy, chill.) But guess what? Amar ek bondhu **al-folio** theme dise, ar amar matha noshto hoise dui din dhore. Bhai, damn! Tore pitabo ami inshallah 😤

## **Markdown, YAML, Liquid—Ki Ki Jinish?**  
- **Markdown**: Easy. `#` diye heading, `*` diye bold—chill.  
- **YAML Front Matter**: Eta **config magic**. `title: "My Blog"` likhle Jekyll bujhe. Kintu spacing vul hole **error dibe**, ar tumi **"KI HOISE?"** bolte bolte google korba.  
- **Liquid Templates**: Eta **Shopify er templating language**. Jekyll e **`{{ }}`** diye variable use kora lage. Loop chalate hole:
  ```liquid
  {% for post in site.posts %}
    {{ post.title }}
  {% endfor %}  <!-- EIBABA CLOSING TAG NA DIYE ERROR DIBE! -->