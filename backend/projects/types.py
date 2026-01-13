import graphene
from graphene_django import DjangoObjectType
from .models import Organization, Project, Task, TaskComment

class OrganizationType(DjangoObjectType):
    class Meta:
        model = Organization
        fields = '__all__'

    project_count = graphene.Int()
    
    def resolve_project_count(self, info):
        return self.projects.count()


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

    task_count = graphene.Int()
    completed_tasks = graphene.Int()
    completion_rate = graphene.Float()

    def resolve_task_count(self, info):
        return self.tasks.count()

    def resolve_completed_tasks(self, info):
        return self.tasks.filter(status='DONE').count()

    def resolve_completion_rate(self, info):
        total = self.tasks.count()
        if total == 0:
            return 0.0
        completed = self.tasks.filter(status='DONE').count()
        return (completed / total) * 100


class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = '__all__'

    comment_count = graphene.Int()

    def resolve_comment_count(self, info):
        return self.comments.count()


class TaskCommentType(DjangoObjectType):
    class Meta:
        model = TaskComment
        fields = '__all__'