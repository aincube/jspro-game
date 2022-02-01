# JSPro Marathon Game

## Lesson 1

Сегодня вам нужно создать новый репозиторий в git и пригласить меня в ревьюеры.

Это делается на вкладке Settings > Access в самом гитхабе на страничке репозетория.

Доступ нужно дать как всегда на почту [zarmarathon@gmail.com](mailto:zarmarathon@gmail.com)

Также нужно настроить приложение.

Все 8 видео помогут в этом.

Шаг за шагом мы разберем, как подключить все нужные нам плагины, лоудеры, настроить Webpack, Eslint, Prettier и конечно же, Husky.

Полезно будет почитать:

1. Heroku CLI - [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
2. Eslint - [https://eslint.org/](https://eslint.org/)
3. Prettier - [https://prettier.io/docs/en/install.html](https://prettier.io/docs/en/install.html)
4. Husky - [https://typicode.github.io/husky/#/](https://typicode.github.io/husky/#/)

Жду твой ссылку на репозиторий и приглашение на возможность ревьюить код.

[https://github.com/](https://github.com/)<ваш*ник>/<ваш*репозиторий>/

### FAQ

1. Не используй в путях к своему проекту Киррилицу.
2. Если у тебя Windows и `env NODE_ENV=development` не работает, возьми аналог `cross-env` [https://www.npmjs.com/package/cross-env](https://www.npmjs.com/package/cross-env) или можно задать переменную через `$env:NODE_ENV="developement"` но тут есть опастность что на heroku это может не взлететь, имей это ввиду, так что лучше использовать **cross-env**
3. 3-й урок

1) Когда запускаете webpack server, то указывайте в начале npx: `npx webpack server`
2) Перед запуском  webpack server установите babel-core: `npm install @babel/core -D`

---

### Comments:

- посмотреть для чего нужны секции main и keywords в package.json
- странная ошибка с semver при попытке установить webpack через npm:

```
npm ERR! semver.simplifyRange is not a function

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/aincube/.npm/_logs/2021-06-29T19_05_55_364Z-debug.log
```

[? Возможнoе решение](https://stackoverflow.com/questions/66729025/npm-err-semver-simplifyrange-is-not-a-function)

при этом `yarn` отработал без ошибок

- странный импорт scss-файла в JS! - разобраться

---

## Lesson 2:
### Task #1

Первая и сама важная наша задача — заставить бегать игрока не только вниз, как мы показано в уроке, но и вправо, влево, вверх-ввниз.

Думаю, труда это не составит.

### Task #2

Вторая задача — сделать так, чтобы игрок упирался в границы нашего холста и дальше идти не мог.

### Task #3

Расположи персонажа по умолчанию в центре экрана, чтобы игра начиналась из центра.

### Task #4 (задание со *)

Помимо персонажа нарисуй при помощи известных вам фигур фон. Примеры своих работы прикладывай в пулл реквесте и, конечно же, делись в чате.

---

## Lesson 3:
После того как нарисуешь карту и вдоволь с ней наиграешься, приступай к созданию классов.

Домашнее задание — создать цикл в классе ClientWorld, который обходит все ячейки карты и рисует ее на игровом поле, используя все классы, которые мы создавали в уроке.

Классы ClientGame, ClientEngine и ClientWorld будут дополняться и расширяться, так что обязательно создай их.

Старайся максимально продуманно описать их, и по возможности, комментируй строки, чтобы не запутаться.

## Lesson 5: 
Понять досконально почему мы вычитаем координаты камеры, т.е. как она накладывается на сетку

## Lesson 7
небольшая неконсистентность в названии методов на сервере:
_chat connection_ но при этом _chat disconnect_
Тогда или *connection/disconnection* или *connect/disconnect*