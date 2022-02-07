# el_pollo_loco_object_orientation

A simple 2d run action game.

Opened Issues :
- Violation Long running JavaScript task took xx ms
    Possible resolve: https://stackoverflow.com/questions/41218507/violation-long-running-javascript-task-took-xx-ms
- Improve logic for World Class. Like Collision check from one Collection of CollidableObjects 
    and handle each collision by its art.
    or like, after a Specific DrawableObject should no longer be drawn or its purpose is over build some kind of Garbage Collector
    and handle each such Object and clear it from Game, like recursive Function that the object has issued should be stopped.
    For example:  Bottles that break on ground, should be disposed after Splash animation end.
- EndBoss self awareness like reactions to player actions.
- EndBoss and Character attacks create Projectile Objects. They must be added to start stop command Button. ( DONE ) 
   and they should be pushed outside the Classes
- Support for touch Devices not implemented.
- Game Over (WIN / LOST ) Screen not implemented.
- Mute / Unmute Command Button only works for background music.
- HP Collectible not implemented.
- Flow animation for Coins and for HP Collectible