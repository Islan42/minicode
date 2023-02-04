# Minicode {#pt-br}

## SOBRE O JOGO

Minicode é um minijogo de apertar botão: você deve pressionar o botão especificado o mais rápido possível (e repetidas vezes) para completar uma barrinha e subir de nível e, no processo, marcar pontos.

Durante a criação do meu próprio web-portfólio, percebi que ele estava meio vazio já que eu não tinha construído nada muito relevante. Então pensei em construir um minigame, um projeto que não fosse muito complexo mas que pudesse quebrar o gelo e passar o tempo. Eu quase instantaneamente lembrei de um minigame que eu jogava quando criança: Em GTA SA é possível entrar numa academia e começar um minigame para levantar halteres, você pressiona um determinado botão repetidas vezes até completar uma barrinha e completar uma repetição.

Com essa inspiração comecei a viajar na ideia e planejar os aspectos da gameplay que eu queria implementar. O que mais me animou, além dos desafios que eu teria que enfrentar (tackle) para implementar tais aspectos, foi como a metalinguagem se encaixava.

Enfim, esse foi o resultado. Espero que gostem.

## ASPECTOS DA GAMEPLAY E CONTEÚDO

### BÁSICO

É um minijogo muito simples: Você pressiona **SPACEBAR** repetidas vezes, o mais rápido que conseguir, até encher a *Barrinha de Código* no canto superior esquerdo da tela. Quando você atinge o máximo da barrinha você sobe de *Nível*, o que gradativamente aumenta a dificuldade do minigame. Porém, se a barrinha chegar a zero você receberá uma marcação de *Penalidade* se ainda não tiver. Se a barrinha chegar a zero enquanto você tiver uma marcação de penalidade, será o fim do jogo.

Além disso, quando você pressiona o botão especificado um certo número de vezes, sua *Pontuação* aumenta.

Outra coisa importante é manter o ritmo. Quanto maior a frequência de clicks mantida maior o *Boost* na pontuação.

![Coding, Lvl, Pontuação, Boost][1]

### IT'S BUGS TIME

Após um bom tempo pressionando o mesmo botão você provavelmente está entediado, mas após um tempo determinado aleatoriamente, após subir de nível, terá que enfrentar a ***HORA DOS BUGS***.

A primeira coisa a se notar é que você deve pressionar um novo botão (escolhido aleatoriamente). Também há dicas visuais para mostrar que você entrou na ***HORA DOS BUGS***, o *Boost* é dobrado e os *Penalties* são setados para 1. A boa notícia é que se você conseguir subir de nível, *Penalties* são resetados para 0, e você terá alcançado muitos pontos.

![É HORA DOS BUGS][2]

### OUTROS

- Ao atingir o *nível 10* as cores mudam para o modo noturno, pois isso é sinal de amadurecimento e profissionalismo.
- Após *subir de nível*, por alguns milésimos de segundo, ou *ao receber uma marcação de penalidade*, por alguns segundos, você fica impedido de receber uma marcação de penalidade.
- Não tente permanecer com o botão pressionado. ***NÃO VAI FUNCIONAR!***

[clique aqui](#pt-br)
 - [ ]
 
![1]: (src/assets/rdm_01.png)
![2]: (src/assets/rdm_02.png)
