let a= ['1A','2A','3A','4A','5A','6A','7A','8A','9A','10A','JA','QA','KA','AA'
    ,'1C','2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC','AC',
    '1H','2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH','AH',
    '1S','2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS','AS'];
let pile1=[];
let ph1=[],ph2=[],ph3=[];
let ph=[];
let active=[ph1,ph2,ph3];
let turnid=0;
let x,check,check2,check3;
let z=[];
function turn()
{ 

  turnid++;
  if(turnid==1)
   {
     active=active[0];
   }
   else if (turnid==2)
  {
    active=active[1];

  } 
  else
  {
    active=active[2];
  }
  check=parseInt(prompt("1.Discarded card \n 2.New card"));
  if(check==1)
    { 
      varcard=discard();
      check2=parseInt(prompt("Anyone wants to challenge \n 1.Yes\n 2.No,0"));  
    if(check==1)
     { tempid= turnid;
       turnid = challenge(card);
       if(turnid==3)
          turnid= tempid;
     }
    
     else
     {
     turn();
    }
  }

     else
     {draw();
      turn();
     }
    
    if(turnid==3)
      turnid=0;
}
function discard()
{ check=parseInt(prompt("how many cards would u like to discard"));
  for(i=0;i<check;i++)
  {
  check2=parseInt(prompt("enter the position of card"));
  pile1.push(check2);
  }
  check3=parseInt("Enter the card to be discarded");

  return check3;                        //card name to be discarded
}



function challenge(card)
{ let temp=0;
  check=parseInt(prompt("which player would like to challenge \nP1\nP2\nP3"));
  for(i=0;i < pile.length ; i++)
  {if(pile[i]!=check3)
  {
    temp++;
    break;
  }
  else 
  {
    continue;
  }
  }
  if(temp==1){
  console.log("CAUGHT");
    return(check);}
    else{
      console.log("correct cards");
    return(3);//3 signify turn back to player challenged
    }
}
function deck()
{
}
function draw()
{
}

function start()
{  
  var rannum=[];
  temp2=1;
  for(let k = 1 ; k < 53; k++)
  {
     rannum[k]= temp2;
     temp2++;
  }
  let b=0;
  let u=0;
  let temp=0;
  for(i=0 ;i <8 ;i++)
  {
            var x = rannum[Math.floor(Math.random()*rannum.length)];
            if(u!=1)
               { for(i =0 ;i <u ; i++)
                   {  if(z[i]==x)
                       { 
                        temp=1;break;
                        }
                      else  continue;
                      }
                   if(temp!=0)
                        x=x-4;
                }
                
                ph[u]= x;
                 u++;
               console.log(x);

  for(let k = 1 ; k < 53; k++)
  {

    if ( rannum[k] == x  ) 
           {  ph[b]=rannum[k];
              b++;
              rannum.splice(k, 1);      //location of element
              k--;
              break;
            }
             if(b==6)
               break;
   }
            
  }
  for(i = 0 ; i <8 ; i++)
   {
      for(j= 1; j< 53;j++)
      {
        if(ph[i]==j)
        {
        ph1[i]=a[j];
        a.splice(j,1);
        break;                        //finding and removing elements
      }
     } 
   }

console.log(ph1);

    
    return ph1;
  }
function game()
{

    console.log("Welcome \n "); 
    console.log("\nBluff game\n");
    ph1=start();
    ph2=start();
    ph3=start(); 
    turn();
}
    function add()
    {
      ph=String.random(a);
  
       for( let i1 = 0; i1 < a.length; i1++)
       { 
           if ( a[i1] == ph ) 
           {
              a.splice(i1, 1);      //i1-location,1 element
              i1--;
              
           }
           break;
        }
        return ph;
      }

game();

