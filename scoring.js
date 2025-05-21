function getRetailerPoints(name){
    name = name.replace(/[^a-z0-9]/gi,"");
    return name.length;
}

function getPricePoints(total){
    
    let points = 0;
    if (total % 1 == 0)
    {
        points+=75;//50 for round amount, 25 for multiple of .25
    }
    else if (total % .25 == 0)
    {
        points += 25;
    }
    return points;   
}

function getDescriptionPoints(item)
{
    let description = item.shortDescription.trim();
    let score = 0;
    if (description.length % 3 == 0 )
    {
        let price = parseFloat(item.price);
        score += Math.ceil(0.2*price);
    }
    return score;
}

function getDatePoints(date)
{
    date = date.split("-");
    if (parseInt(date[2])==1)
    {
        return 6;
    }
    else{
        return 0;
    }
}

function getCountPoints(list)
{
    return parseInt(list.length / 2) * 5;
}
function getTimePoints(time) {
    time = time.split(":");
    let hour = parseInt(time[0])
    if(hour >= 14 && hour < 16)
    {
        return 10;
    }
    else
    {
        return 0;
    }
}
let list = {
    "retailer": "JK Corner Market",
    "purchaseDate": "2022-03-20",
    "purchaseTime": "14:33",
    "items": [
      {
        "shortDescription": "Gatorade",
        "price": "2.25"
      },{
        "shortDescription": "Gatorade",
        "price": "2.25"
      },{
        "shortDescription": "Gatorade",
        "price": "2.25"
      },{
        "shortDescription": "Gatorade",
        "price": "2.25"
      }
    ],
    "total": "9.00"
  }

  function scoreReceipt(receipt)
  {
    let score = 0;
    score += getDatePoints(receipt.purchaseDate);
    score += getCountPoints(receipt.items);
    receipt.items.forEach(element => {
        score += getDescriptionPoints(element)
    });
    score += getPricePoints(receipt.total);
    score += getRetailerPoints(receipt.retailer);
    score += getTimePoints(receipt.purchaseTime);
    return score;
  }

  console.log(getPricePoints(list.total));
  console.log(getCountPoints(list.items));
  console.log(getDescriptionPoints(list.items[1]));
  console.log(getDatePoints(list.purchaseDate));
  console.log(getRetailerPoints(list.retailer));
  console.log(getTimePoints(list.purchaseTime));
  console.log(scoreReceipt(list));

  module.exports= scoreReceipt;
