/**
 * An extension of CollidableObject. Representing a CollectibleObject which the character can collect if it collides with one
 * and the Character is allowed to collect one. 
 */
class CollectibleObject extends CollidableObject{

    /**
     * @type {boolean}  A Flag to check if this instance can been collected
     */
    collectable = true;

    delete(){
        super.stopAnimate();
        delete this;
    }

    /**
     * @override @function canCollide
     * @returns {boolean}
     */
    canCollide(){
        return this.collectable && super.canCollide();
    }
}