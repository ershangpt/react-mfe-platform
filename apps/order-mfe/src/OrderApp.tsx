import { Button, Card } from '@company/ui';

export default function ProductApp() {
  return (
    <Card>
      <h1>Order MFE</h1>

      <p>This application is running as a remote.</p>

      <Button onClick={() => alert('Order placed')}>
        Order Placed
      </Button>
    </Card>
  );
}