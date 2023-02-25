/**
 * An extension of DestroyableObject,
 *  used as an abstract definition for this instances which can perform some sort of attack.
 */
class Creature extends DestroyableObject {
    /**
     * Control flag, to determine if this instance is performing an attack
     * @type {boolean}
     */
    attacking = false;

    /**
     * @abstract,
     * Checks if this instance it is able to perform an attack
     */
    canAttack() {
        //TIME CONTROLLED
        throw new Error('You have to implement the method canAttack!');
    }

    /**
     * Sets currentImage to 0.
     * This action requires that animation starts with first image from attack images array.
     */
    attack() {
        // throw new Error('You have to implement the method attack!');
        this.currentImage = 0;
    }
}