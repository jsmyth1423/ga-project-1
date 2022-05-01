# Space Invaders - SEI Project 1

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

(![image](https://user-images.githubusercontent.com/53213823/166149142-b5a20b3e-443e-4434-8717-51184aaac816.png)
