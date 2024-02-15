var randomNumber1 = Math.random();

randomNumber1= 6*randomNumber1+1;

randomNumber1=Math.floor(randomNumber1);



dice1_src="images\\dice"+randomNumber1+".png"

document.querySelector(".img1").setAttribute("src",dice1_src);

randomNumber2 = Math.floor(Math.random()*6+1);

dice2_src="images\\dice"+randomNumber2+".png"

document.querySelector(".img2").setAttribute("src",dice2_src);


if (randomNumber1 > randomNumber2){

    document.querySelector("#result").innerHTML="🚩Oyuncu 1 Kazandı!"
}
else if (randomNumber2 > randomNumber1){

    document.querySelector("#result").innerHTML="Oyuncu 2 Kazandı!🚩"
}
else {
    document.querySelector("#result").innerHTML="Berabere!"
}

