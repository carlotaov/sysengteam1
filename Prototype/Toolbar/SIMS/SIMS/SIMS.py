from flask import *
from functools import wraps
import os
import sqlite3


app = Flask(__name__)

app.config.from_object(__name__)  # load config from this file

# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'sims.db'),
    SECRET_KEY='development key',
))


def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


@app.cli.command()
def initdb():
    """Initializes the database."""
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()
    print('Initialized the database.')


def get_db():
    """Opens a new database connection if there is none yet for the
    current application context."""
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db


def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()


def query_db(query, args=(), one=False):
    """Helper function to make db queries"""
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect(url_for('login', next=request.url))
    return decorated_function


def templated(template=None):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            template_name = template
            if template_name is None:
                template_name = request.endpoint \
                    .replace('.', '/') + '.html'
            ctx = f(*args, **kwargs)
            if ctx is None:
                ctx = {}
            elif not isinstance(ctx, dict):
                return ctx
            return render_template(template_name, **ctx)
        return decorated_function
    return decorator


@app.route('/')
@templated('index.html')
@login_required
def index():
    pass


def email_exist(email):
    pass


def username_exist(username):
    pass


@app.route('/register', methods=['GET', 'POST'])
@templated('register.html')
def register():
    error = None
    if request.method == 'POST':
        if request.form['password']=='' or request.form['confirm']=='' or request.form['email']=='' or request.form['name']=='' or  request.form['username']=='':
            error = 'Please input all the fields.'
        elif request.form['password'] != request.form['confirm']:
            error = 'Passwords do not match.'
        elif len(request.form['password']) < 5:
            error = 'Pasword too short. It should be at least 5 characters long.'
        elif len(request.form['email']) < 5:
            error = 'Email too short to be valid.'
        elif len(request.form['username']) < 5:
            error = 'Username has to be at least 5 characters long.'
        elif email_exist(request.form['email']):
            error = 'An account with the e-mail:"{}" is already registered.'.format(request.form['email'])
        elif username_exist(request.form['username']):
            error = 'An account with the username:"{}" is already registered.'.format(request.form['username'])
        else:
            # Input validated now we can add to database
            db = get_db()
            query = 'insert into users (name, username, email, password) values (?, ?, ?, ?)'
            args =[request.form['name'], request.form['username'], request.form['email'], request.form['password']]
            db.execute(query, args)
            db.commit()
            return redirect(url_for('login'))
    return dict(error=error)


@app.route('/login', methods=['GET', 'POST'])
@templated('login.html')
def login():
    error = None
    if request.method == 'POST':
        if len(request.form['password']) < 5 or len(request.form['username']) < 5:
            error = 'Invalid user credentials.'
        else:
            r = query_db('select name, username, password from users where username="{}"'.format(request.form['username']), one=True)
            if r == None:
                error = 'Username not recognized. Please try again.'
            elif r['password'] != request.form['password']:
                error = 'Wrong password. Please try again'
            else:
                flash(r['name'])
                session['logged_in'] = True
                return redirect(request.form['redirect'])
    return dict(error=error)


@app.route('/forgot_password', methods=['GET', 'POST'])
@templated('forgot_password.html')
def forgot_password():
    pass


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
