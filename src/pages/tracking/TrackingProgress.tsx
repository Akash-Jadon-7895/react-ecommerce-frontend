import dayjs from "dayjs";

type TrackingProgressProps = {
  deliveryTimeMs: number;
  orderTimeMs: number;
};

export function TrackingProgress({ deliveryTimeMs, orderTimeMs }: TrackingProgressProps) {
  const totalDeliveryTimeMs = deliveryTimeMs - orderTimeMs;
  const timePassedMs = dayjs().valueOf() - orderTimeMs;
  const deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

  let status = 'Preparing';

  if (deliveryPercent >= 100) {
    status = 'Delivered';
  } else if (deliveryPercent >= 33 && deliveryPercent < 100) {
    status = 'Shipped';
  }
  return (
    <>
      <div className="progress-labels-container">
        <div className={`progress-label ${status === 'Preparing' ? 'current-status' : ''}`}>
          Preparing
        </div>
        <div className={`progress-label ${status === 'Shipped' ? 'current-status' : ''}`}>
          Shipped
        </div>
        <div className={`progress-label ${status === 'Delivered' ? 'current-status' : ''}`}>
          Delivered
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${deliveryPercent}%` }}></div>
      </div>
    </>
  );
}