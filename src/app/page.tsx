
import ServicePage from '../components/ServicePage';
import RouteTransition from '../components/RouteTransition';
export default function Page() {

  return (
    <RouteTransition>
      <ServicePage />
    </RouteTransition>
  );
}
