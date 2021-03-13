kubectl delete -f manifests/secret.yaml
kubectl delete -f manifests/statefulset.yaml # postgres-db
kubectl delete -f manifests/configmap-backend.yaml
kubectl delete -f manifests/deployment-backend.yaml
kubectl delete -f manifests/serviceBackend.yaml
kubectl delete -f manifests/ingress.yaml
kubectl delete -f manifests/persistentvolumeclaim.yaml
kubectl delete -f manifests/persistentvolume.yaml 
