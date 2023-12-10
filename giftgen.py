import json
import random
from flask import Flask, request, jsonify

app = Flask(__name__)

giftIdeas = '''
[
  {
    "name": "Gimbal",
    "description": "Gift a photography enthusiast with smooth and steady shots on their backpacking adventures with this versatile gimbal.",
    "interests": ["Photography", "Backpacking"]
  },
  {
    "name": "Portable Photo Printer",
    "description": "Let photography lovers instantly print and share their favorite memories on the go with this portable photo printer.",
    "interests": ["Photography"]
  },
  {
    "name": "Polaroid Camera",
    "description": "Embrace instant photography joy with a Polaroid camera, perfect for capturing spontaneous moments with timeless charm.",
    "interests": ["Photography"]
  },
  {
    "name": "Wireless Headphones",
    "description": "For both music and gaming, wireless headphones help immerse the user in crystal-clear sound and comfort.",
    "interests": ["Dance", "Gaming"]
  },
  {
    "name": "Bluetooth Speaker",
    "description": "Turn any space into a dance floor with a portable Bluetooth speaker",
    "interests": ["Dance"]
  },
  {
    "name": "Sketchbook",
    "description": "Fuel the creativity of drawing enthusiasts with a high-quality sketchbook, providing a blank canvas for artistic expression and imagination.",
    "interests": ["Drawing"]
  },
  {
    "name": "Art Tote Bag",
    "description": "Combine practicality with artistic flair with this durable art tote bag to carry their essentials in style.",
    "interests": ["Drawing", "Painting"]
  },
  {
    "name": "Outdoor Hat",
    "description": "Shield fishing, backpacking, or gardening enthusiasts from the elements in style with this versatile outdoor hat.",
    "interests": ["Fishing", "Backpacking", "Gardening"]
  },
  {
    "name": "Custom Apron",
    "description": "Transform cooking or painting sessions into a personalized experience for kitchen and art enthusiasts with this custom apron.",
    "interests": ["Cooking", "Painting"]
  },
  {
    "name": "Recipe Cookbook",
    "description": "Inspire culinary adventures for cooking enthusiasts with this carefully curated recipe cookbook, a treasure trove of delicious recipes.",
    "interests": ["Cooking"]
  },
  {
    "name": "Garden Kneeler and Seat",
    "description": "Make gardening comfortable and enjoyable with this versatile garden kneeler and seat, providing essential support for plant care.",
    "interests": ["Gardening"]
  },
  {
    "name": "Gardening Tool Set",
    "description": "Equip green-thumbed friends with a comprehensive gardening tool set, perfect for those who find joy in nurturing their garden.",
    "interests": ["Gardening"]
  },
  {
    "name": "Essential Oils Diffuser",
    "description": "Enhance the gardening experience with an essential oils diffuser, creating a calming ambiance for relaxation in the garden.",
    "interests": ["Gardening"]
  },
  {
    "name": "Custom/Team Jersey",
    "description": "Show team spirit and pride for a friend and gift them with their favorite sports team jersey or t-shirt.",
    "interests": ["Sports"]
  },
  {
    "name": "Game Tickets",
    "description": "Enjoy a live sports game together with your friend by booking game tickets.",
    "interests": ["Sports"]
  },
  {
    "name": "Massage Ball",
    "description": "Relieve post-workout tension for athletes with a massage ball, targeting sore muscles for a thoughtful recovery.",
    "interests": ["Sports"]
  },
  {
    "name": "Custom Gaming Mouse Pad",
    "description": "Level up the gaming experience with a custom gaming mouse pad, adding a personalized touch to their gaming setup.",
    "interests": ["Gaming"]
  },
  {
    "name": "Gaming Headset",
    "description": "Immerse gamers in the virtual world with a gaming headset, delivering immersive sound and clear communication.",
    "interests": ["Gaming"]
  },
  {
    "name": "Custom Controller",
    "description": "Elevate the gaming experience with a custom controller, adding a personalized touch to the gaming setup.",
    "interests": ["Gaming"]
  }
]
'''

#convert json to py objects
giftObjects = json.loads(giftIdeas)

@app.route('/gift-ideas', methods=['POST'])
def getGift():
    try:
        interestData = request.json

        # extract user interests
        interestList = interestData.get("interests", [])

        # filter gift ideas by user interests
        giftList = [gift for gift in giftObjects if any(interest in gift["interests"] for interest in interestList)]

        # select one gift idea at random
        if giftList:
            selectedGift = random.choice(giftList)
            print("Generated Gift: " + selectedGift['name'])
            return jsonify(selectedGift)
        else:
            selectedGift = random.choice(giftObjects)
            print("Generated Gift: " + selectedGift['name'])
            return jsonify(selectedGift) # if no matching interests, return random idea from whole set

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
