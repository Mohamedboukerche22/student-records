from flask import Flask, render_template, request, redirect, session, url_for, jsonify
import json

app = Flask(__name__)
app.secret_key = 'secret_key'

USERS = {
    "student": {"password": "student123", "role": "student"},
    "teacher": {"password": "teacher123", "role": "teacher"}
}

def load_students():
    try:
        with open("users.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []
def save_students(data):
    with open("users.json", "w") as f:
        json.dump(data, f)

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        user = USERS.get(username)
        if user and user["password"] == password:
            session["username"] = username
            session["role"] = user["role"]
            return redirect("/dashboard")
        else:
            return "Invalid credentials", 401
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    if "username" not in session:
        return redirect("/")
    return render_template("index.html", role=session["role"], username=session["username"])

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/add_student", methods=["POST"])
def add_student():
    if session.get("role") != "teacher":
        return "Unauthorized", 403
    students = load_students()
    student = {
        "name": request.form["name"],
        "class": request.form["class"],
        "average": request.form["average"]
    }
    students.append(student)
    save_students(students)
    return redirect("/dashboard")

@app.route("/search_student", methods=["POST"])
def search_student():
    name = request.form["search"]
    students = load_students()
    results = [s for s in students if s["name"].lower() == name.lower()]
    return jsonify(results)

@app.route("/get_students")
def get_students():
    return jsonify(load_students())
