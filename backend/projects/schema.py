import graphene
from .models import Organization, Project, Task, TaskComment
from .types import OrganizationType, ProjectType, TaskType, TaskCommentType


class Query(graphene.ObjectType):
    # Organizations
    organizations = graphene.List(OrganizationType)
    organization = graphene.Field(OrganizationType, slug=graphene.String())

    # Projects
    projects = graphene.List(
        ProjectType,
        organization_slug=graphene.String(required=True)
    )
    project = graphene.Field(ProjectType, id=graphene.ID())

    # Tasks
    tasks = graphene.List(TaskType, project_id=graphene.ID(required=True))
    task = graphene.Field(TaskType, id=graphene.ID())

    # Comments
    task_comments = graphene.List(
        TaskCommentType,
        task_id=graphene.ID(required=True)
    )

    def resolve_organizations(self, info):
        return Organization.objects.all()

    def resolve_organization(self, info, slug):
        return Organization.objects.get(slug=slug)

    def resolve_projects(self, info, organization_slug):
        return Project.objects.filter(
            organization__slug=organization_slug
        ).select_related('organization')

    def resolve_project(self, info, id):
        return Project.objects.get(pk=id)

    def resolve_tasks(self, info, project_id):
        return Task.objects.filter(project_id=project_id)

    def resolve_task(self, info, id):
        return Task.objects.get(pk=id)

    def resolve_task_comments(self, info, task_id):
        return TaskComment.objects.filter(task_id=task_id)


class CreateOrganization(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        contact_email = graphene.String(required=True)

    organization = graphene.Field(OrganizationType)

    def mutate(self, info, name, contact_email):
        organization = Organization(
            name=name,
            contact_email=contact_email
        )
        organization.save()
        return CreateOrganization(organization=organization)


class CreateProject(graphene.Mutation):
    class Arguments:
        organization_slug = graphene.String(required=True)
        name = graphene.String(required=True)
        description = graphene.String()
        status = graphene.String()
        due_date = graphene.Date()

    project = graphene.Field(ProjectType)

    def mutate(self, info, organization_slug, name, **kwargs):
        organization = Organization.objects.get(slug=organization_slug)
        project = Project(
            organization=organization,
            name=name,
            description=kwargs.get('description', ''),
            status=kwargs.get('status', 'ACTIVE'),
            due_date=kwargs.get('due_date')
        )
        project.save()
        return CreateProject(project=project)


class UpdateProject(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        description = graphene.String()
        status = graphene.String()
        due_date = graphene.Date()

    project = graphene.Field(ProjectType)

    def mutate(self, info, id, **kwargs):
        project = Project.objects.get(pk=id)
        for key, value in kwargs.items():
            if value is not None:
                setattr(project, key, value)
        project.save()
        return UpdateProject(project=project)


class CreateTask(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
        title = graphene.String(required=True)
        description = graphene.String()
        status = graphene.String()
        assignee_email = graphene.String()
        due_date = graphene.DateTime()

    task = graphene.Field(TaskType)

    def mutate(self, info, project_id, title, **kwargs):
        project = Project.objects.get(pk=project_id)
        task = Task(
            project=project,
            title=title,
            description=kwargs.get('description', ''),
            status=kwargs.get('status', 'TODO'),
            assignee_email=kwargs.get('assignee_email', ''),
            due_date=kwargs.get('due_date')
        )
        task.save()
        return CreateTask(task=task)


class UpdateTask(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        description = graphene.String()
        status = graphene.String()
        assignee_email = graphene.String()
        due_date = graphene.DateTime()

    task = graphene.Field(TaskType)

    def mutate(self, info, id, **kwargs):
        task = Task.objects.get(pk=id)
        for key, value in kwargs.items():
            if value is not None:
                setattr(task, key, value)
        task.save()
        return UpdateTask(task=task)


class CreateTaskComment(graphene.Mutation):
    class Arguments:
        task_id = graphene.ID(required=True)
        content = graphene.String(required=True)
        author_email = graphene.String(required=True)

    comment = graphene.Field(TaskCommentType)

    def mutate(self, info, task_id, content, author_email):
        task = Task.objects.get(pk=task_id)
        comment = TaskComment(
            task=task,
            content=content,
            author_email=author_email
        )
        comment.save()
        return CreateTaskComment(comment=comment)


class Mutation(graphene.ObjectType):
    create_organization = CreateOrganization.Field()
    create_project = CreateProject.Field()
    update_project = UpdateProject.Field()
    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    create_task_comment = CreateTaskComment.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)