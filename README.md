# DC Monitor

Verifica desconexão em Ragnarok Online usando reconhecimento textual em imagens.

## Pré-requisitos

- Algo que capture screenshots do jogo periodicamente como o ![Auto Screen Capture](https://sourceforge.net/projects/autoscreen/)
- ![NodeJS](http://nodejs.org)
- ![Tesseract](https://github.com/tesseract-ocr/tesseract/wiki/Downloads)
- ![ImageMagick](https://www.imagemagick.org/script/download.php)

## Configurando

- Clonar o repositório ou ![baixar o zip](https://github.com/sergiovilar/dc-monitor/archive/master.zip)
- Abrir o terminal do NodeJS na pasta do projeto e rodar `npm install`
- ![Adicionar Tesseract e ImageMagick ao PATH](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)
- Fazer com que o software de captura escreva as imagens na pasta `screenshots`
- Criar um arquivo .env na pasta do projeto da seguinte forma:

```
TELEGRAM_TOKEN=<SEU_TOKEN>
```

Sendo `<SEU_TOKEN>` sendo substituído pelo Token do Telegram que você obtém ao ![criar o bot](https://core.telegram.org/bots#creating-a-new-bot).

## Rodando o projeto

Para processar apenas a última screenshot, abra o terminal do NodeJS rode:

    node index.js run

Para iniciar o bot do telegram, abra o terminal do NodeJS rode:

    node index.js bot

## Comandos do bot do telegram

#### /start

Inicia o monitoramento das screenshots

#### /stop

Pausa o monitoramento das screenshots

#### /state

Retorna a última screenshot

