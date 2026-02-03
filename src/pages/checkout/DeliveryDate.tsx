import dayjs from "dayjs"
import type { SelectedDeliveryOption } from "../../types/checkout";

type DeliveryDateProps = {
  selectDeliveryOption: SelectedDeliveryOption;
};
export function DeliveryDate({selectDeliveryOption}: DeliveryDateProps) {
  return (<div className="delivery-date">
    Delivery date: {selectDeliveryOption ? dayjs(selectDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D') : "Not selected"}
  </div>);
}