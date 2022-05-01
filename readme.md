# Space Invaders - SEI Project 1

[Play it here!](https://jsmyth1423.github.io/ga-project-1/)

## Overview

Space Invaders is a  simple arcade game in which you control a gun turret at the bottom of the play area, only being able to move left and right while attempting to stop the aliens from reaching you. This is achieved by shooting them with a laser and dodging the bombs that they drop. This was a solo project built over a week mostly using JavaScript but also interaction with HTML and CSS.

**Controls:**  
Left and Right arrow keys to move  
C to shoot


## The Task:

* **Render a game in the browser**
* **Design logic for winning** & **visually display which player won**
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **Javascript for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it
* Use **semantic markup** for HTML and CSS (adhere to best practices)

---

## The Plan: 
![alt text](https://i.imgur.com/IVZ0dIG.png)

I wireframed my basic idea as well as the steps I thought I would have to take in order to making a minimum viable product. This gave me a solid baseline of steps to work through.

## Key Challenges:

The primary issues were as follows:
1. Stopping the player character from moving onto and beyond the edges of the screen.
2. Making the aliens drop one and move in the other direction once colliding with an edge.
3. Collision detection between Alien & Player missile.


The majority of project time was spent on the above issues.

1. Originally I tried to define the edges of the area manually in an array, but found an easier solution being using modulus with the width of the grid pre-defined.

![image](https://user-images.githubusercontent.com/53213823/166149142-b5a20b3e-443e-4434-8717-51184aaac816.png)

---
2. The below function handled Alien movement, with a series of if statements to check for the edges and then subsequent actions to create the moving block effect.

![image](https://user-images.githubusercontent.com/53213823/166149254-334e8601-511c-4066-9280-d80a2ba52de1.png)

This function also contained the logic for win and loss based on 3 factors, if the aliens collided with the player ship, if the aliens reached the bottom of the screen, as well as if the aliens were all destroyed.

![image](https://user-images.githubusercontent.com/53213823/166149286-63b6e2c9-d247-4d99-a53a-3559d38da9b9.png)

---

3. The final challenge was using timeouts for the missile movement as well as checking for collision with the alien, detailed below.

![image](https://user-images.githubusercontent.com/53213823/166149386-d42a6521-f75a-444f-b99a-61ddbbce1f92.png)

---
## Lessons Learned
1. Good planning makes all the difference:
  For the areas I had planned out I flew through the coding since I was already fairly sure of the direction
  Areas which I had not considered took much longer, in part due to complexity but also not having any direction to work towards.
  
2. Expectations are hard to gauge when you're starting out:
  I was unsure of how much I would be able to get done if much at all within the 1 week period, having the stretch goals was useful as I allowed myself to work through   the main project quickly in order to try and implement them, which was a relief as I just about got my initial goals done, stretch aside. As projects have come and     gone I still find it difficult to gauge how long it will take when working in a new area.
---

## Ideals 

1. Sound, just generally makes a game feel more game-y!
2. Collision detection between missile and alien bombs so that the player can destroy them rather than just dodging.
3. Learning how to make the movement of the aliens more smooth, perhaps CSS animations.
