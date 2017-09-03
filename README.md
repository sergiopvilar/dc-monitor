# DC Monitor

Verifica desconexão em Ragnarok Online usando reconhecimento textual em imagens.

## Pré-requisitos

- Algo que capture screenshots do jogo periodicamente como o ![Auto Screen Capture](https://sourceforge.net/projects/autoscreen)
- ![NodeJS](http://nodejs.org)
- ![Tesseract](http://digi.bib.uni-mannheim.de/tesseract/tesseract-ocr-setup-4.00.00dev.exe)
- ![ImageMagick](https://www.imagemagick.org/download/binaries/ImageMagick-7.0.6-10-portable-Q16-x86.zip)

### Como instalar os pré-requisitos

Veja ![neste guia](./SETUP.md) como instalar o NodeJS, Tesseract e ImageMagick.

## Configurando o reconhecimento de imagem

- Clone o repositório ou ![baixe o zip](https://github.com/sergiovilar/dc-monitor/archive/master.zip)
- Abra o **Node.js command prompt**, entre na pasta do projeto e rode `npm install`
- ![Adicione o Tesseract e o ImageMagick ao PATH](./SETUP.md)

## Testando a configuração

1 - Baixe esta imagem para sua pasta `sceenshots`:

![screenshot](https://dl.dropboxusercontent.com/s/ovxr1ztlz3qigmv/source.png)

2 - Abra o **Node.js command prompt**, entre na pasta do projeto e rode:

    node index.js run

Você deverá ver uma mensagem "Personagem tomou DC".

## Configurando o bot do Telegram

- Faça com que o software de captura escreva as imagens na pasta `screenshots`
- Crie um arquivo chamado `.env` na pasta do projeto da seguinte forma:

```
TELEGRAM_TOKEN=<SEU_TOKEN>
```

Sendo `<SEU_TOKEN>` sendo substituído pelo Token do Telegram que você obtém ao ![criar o bot](https://core.telegram.org/bots#creating-a-new-bot).

## Rodando o projeto

Para iniciar o bot do telegram, abra o **Node.js command prompt** e rode:

    node index.js bot

## Comandos do bot do telegram

#### /start

Inicia o monitoramento das screenshots

#### /stop

Pausa o monitoramento das screenshots

#### /state

Retorna a última screenshot

