#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from flask import Flask, render_template
import uuid

app = Flask(__name__)


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/100-hbnb/', strict_slashes=False)
def hbnb_filters(the_id=None):
    """ HBNB is alive! """
    state_objs = storage.all('State').values()
    states = dict([state.id, state.name] for state in state_objs)

    city_objs = storage.all('City').values()
    cities = dict([city.id, city.name] for city in city_objs)

    amenities = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())

    return render_template('100-hbnb.html',
                           cache_id=uuid.uuid4(),
                           states=states,
                           cities=cities,
                           amenities=amenities,
                           places=places,
                           users=users)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
