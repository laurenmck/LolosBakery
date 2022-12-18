// TODO: create a component that displays a single bakery item
import "./BakeryItem.css";

function BakeryItem(item, index) {
 
  return(
    <div>
      <img src={item.image} width="290" height="250" />
      <div class="des">
        <p class="boldbig">{item.name}</p>
        <p>{item.description}</p>
        <p>$ {item.price}</p>
      </div>
    </div>
  )
}

export default BakeryItem;
