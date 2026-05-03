print("starting the file....")
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

# My secret recipe book don't cheat :)
# We combine the name with a "+" to check if they match
RECIPES = {
    "Quark+Quark": "Proton",
    "Electron+Proton": "Hydrogen",
    "Hydrogen+Hydrogen": "Helium",
    "Helium+Helium": "Carbon",
    "Carbon+Helium": "Oxygen",
    "Helium+Hydrogen": "Star",
    "Hydrogen+Oxygen": "Water",
    "Carbon+Hydrogen": "Soil",
    "Soil+Water": "Planet",
    "Planet+Star": "Solar System",
    "Nothing+Nothing": "Black Hole",
    "Electron+Photon": "Energy Beam",
    "Black Hole+Solar System": "Universe"
}

#order for players to discover things
ORDERED_TARGETS = [
    "Proton", "Hydrogen", "Helium", "Carbon", "Oxygen", "Star", 
    "Water", "Soil", "Planet", "Solar System", "Black Hole",
    "Universe", "Energy Beam"
]

#Hints for the targer
HINTS = {
    "Proton": "Combine the two smallest fundamental building blocks you have.",
    "Hydrogen": "You get something when you combine a positive core with a negative particle?",
    "Helium": "Smash two of the lightest elements together.",
    "Carbon": "Use your leatest discovery only to discover Carbon",
    "Oxygen": "Combin something with your newley made Carbon Hit and trial",
    "Star" : "What are some of the main gasses for fusion in stars",
    "Water" :"What periodic table elements are present in water?",
    "Soil": "Which element is basis of life mix it with Hydrogen",
    "Planet": "If you want to make habitable rock what do you need think of earth and what you have discovered",
    "Solar System": "What makes our solar system, SOLAR SYSTEM",
    "Black Hole": "Nothing with Nothing sounds cool",
    "Universe": "Solar System and void sounds like our universe",
    "Energy Beam": "Use electricity and light to make something cool."
}

@app.route('/')
def home():
    #HTML file
    return render_template('index.html')

@app.route('/combine', methods=['POST'])
def combine():
    data = request.json
    item1 = data.get('item1')
    item2 = data.get('item2')

    #to make quark+elecron same as vise versa
    items = sorted([item1, item2])
    recipe_key = f"{items[0]}+{items[1]}"

    # Check if combination exists or not 
    if recipe_key in RECIPES:
        return jsonify({"success": True, "result": RECIPES[recipe_key]})
    else:
        return jsonify({"success": False, "result": "Nothing Happened..."})
    
#The hint route
@app.route('/hint', methods=['POST'])
def get_hint():
    data = request.json
    inventory = data.get('inventory', []) #what player already has

    #go through the order
    for target in ORDERED_TARGETS:
        if target not in inventory:
            return jsonify({"hint": f"💡 Hint: {HINTS[target]}"})
        
    return jsonify({"hint": "🌟 You have discovered everything! No more hints needed."})     

if __name__ == '__main__':
    app.run(debug=True)