# Project-Zero-Touch
**Bare-Metal Local Cloud & CI/CD Pipeline**

**What even is this**
I used an old, bare-minimum PC (Core2Duo, 4GB DDR2 RAM). It was lying around useless, so I decided to turn it into my own mini home server. Now, it hosts a custom web application and updates automatically whenever I write and push new code.

**Setup**
I wiped the old PC and installed Debian Linux. I run it "headless," which means there is no monitor attached, and I control the server entirely remotely from my main PC.

**Internet Bridge**
The server PC required internet, so I connected it directly to my main PC using a LAN cable. I set up custom routing rules on my main machine to share its internet connection down the wire. (This networking part was the biggest headache, but it works perfectly now).

**Hosting the Website**
I containerized a text-based web game using Docker, ensuring it runs cleanly in an isolated local environment on the server.

**Auto-Update Pipeline**
Manually logging into the server every time I update the code would be a drag. Instead, I set up a background agent using GitHub Actions. Now, whenever I push new code to GitHub, the home server automatically detects it, pulls the changes, and restarts the live website in seconds.

**Going Public**
To make the local site accessible anywhere, I set up a tool called Ngrok. It runs securely in the background and punches a tunnel straight from my server to the public internet.

**Built With**

**Hardware & Network**

The Server: Repurposed old PC (Core2Duo)

Main PC: Dell OptiPlex

OS: Debian Linux (headless server) & Arch Linux (Main PC)

Networking: 5G mobile data routed from the main PC to the server via a physical LAN cable.

**Software Pipeline**

Containerization: Docker

Automation: GitHub Actions

Public Tunneling: Ngrok

Stack: Python & Flask, HTML, CSS, JS

**Images**

**How to Contribute**
Because the software is tied directly to physical hardware sitting in my room, direct server contributions aren't possible. However, if you are into homelabbing or hardware infrastructure, I welcome recommendations and advice on how to improve this setup!

**Deployment**
This project is heavily focused on hardware and networking infrastructure, so a permanent live demo link isn't practical. Instead, here is a video demonstration showing the physical hardware and the entire automated pipeline in action:

Link: [Insert your YouTube link here]
