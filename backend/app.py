from flask import Flask, request
from database import db, Task


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'


db.init_app(app)
with app.app_context():
    db.create_all()


@app.route("/v1/user/<user_id>/tasks/", methods=["GET"])
def get_tasks():
    tasks = Task.query.all(user_id=user_id)
    return tasks


@app.route("/v1/user/<user_id>/task/", methods=["POST"])
def create_new_task(self, user_id):
    content = request.form['content']
    task = Task(user_id=user_id, content=content)
    db.session.add(task)
    db.session.commit()
    return { "status": "success" }, 200


@app.route("/v1/user/<user_id>/task/<task_id>/", methods=["DELETE"])
def delete_task(self, user_id, task_id):
    task = Task.query.filter_by(user_id=user_id, id=task_id).first()
    db.session.delete(task)
    db.session.commit()
    return { "status": "success" }, 200


@app.route("/v1/user/<user_id>/task/<task_id>/", methods=["PATCH"])
def update_task(self, user_id, task_id):
    task = Task.query.filter_by(user_id=user_id, id=task_id)
    task.in_progress = False
    return { "status": "success" }, 200


if __name__ == '__main__':
    app.run(debug=True)
