from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializer import LeadSerializer


# Lead viewset (
# using viewset we can create full CRUD API
# )
#

class LeadViewSet(viewsets.ModelViewSet):
 # queryset = Lead.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = LeadSerializer

    # authonticate get query set menthod
    def get_queryset(self):
        return self.request.user.leads.all()

    # save the owner of the Leads
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
