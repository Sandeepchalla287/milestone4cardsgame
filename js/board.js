

a[52]=[ '1A','2A','3A','4A','5A','6A','7A','8A','9A','10A','JA','QA','KA','AA',
'1C','2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC',
'1H','2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH',
'1S','2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS'

];
turn()
{ discard=add();
turnid++;
check=parseInt(prompt("1.Discarded card " \n " 2.New card",0));
if(check==1)
discard();
else
draw();
check2=parseInt(prompt("Anyone wants to challenge ")  
}
function discard()
{
}
function deck()
{
}
function draw()
{
}

function start()
{

for(i=0;i<7;i++)
{

ph[i]=Math.random(a);

for( var i1 = 0; i1 < a.length; i1++)
{ 
   if ( a[i1] === p1H[i] ) 
   {
      a.splice(i1, 1);      //i1-location,1 element
      i1--;
      
   }
   break;
}
}
return ph;
}
function game()
{

console.log("Welcome \n ");
console.log("Bluff game");
ph1=start();
ph2=start();
ph3=start(); 
Turn()
{

}
}  




add()
{
ph=Math.random(a);

for( var i1 = 0; i1 < a.length; i1++)
{ 
   if ( a[i1] === p1H[i] ) 
   {
      a.splice(i1, 1);      //i1-location,1 element
      i1--;
      
   }
   break;
}
return ph;
}