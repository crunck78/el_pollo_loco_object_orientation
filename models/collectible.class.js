/**
 * An extension of CollidableObject. Representing a CollectibleObject which the character can collect if it collides with one
 * and the Character is allowed to collect one. 
 */
class CollectibleObject extends CollidableObject{
    delete(){
        this.stopAnimate();
        delete this;
    }
}