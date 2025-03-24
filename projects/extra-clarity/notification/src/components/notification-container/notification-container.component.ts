import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BehaviorSubject, map } from 'rxjs';

import { NOTIFICATION_DEFAULT_CONFIG } from '../../constants';
import { NotificationData, NotificationPosition } from '../../typings';

@Component({
  selector: 'ec-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NotificationContainerComponent {
  readonly instances$ = new BehaviorSubject<Required<NotificationData[]>>([]);
  readonly groupedInstances$ = this.instances$.pipe(
    map((instances) => this.groupByConfigPosition(instances)),
  );

  create(notification: NotificationData): void {
    const instance = this.mergeConfig(notification);

    this.instances$.next([...this.instances$.value, instance]);
  }

  remove(notification: NotificationData): void {
    const instances = this.instances$.value;

    instances.some(({ id }, index) => {
      if (notification.id === id) {
        instances.splice(index, 1);
        this.instances$.next([...instances]);

        return true;
      }

      return false;
    });
  }

  trackGroupById(index: number, [group]: [string, NotificationData[]]): string {
    return group;
  }

  private groupByConfigPosition(
    instances: NotificationData[],
  ): [NotificationPosition | 'undefined', NotificationData[]][] {
    // This method replaces the 'toPairs' and 'groupBy' methods from lodash:
    //   toPairs(groupBy(instances, 'config.position')))

    // For non-enum 'position' values the 'undefined' key is used

    const result = new Map<NotificationPosition | 'undefined', NotificationData[]>();

    instances.forEach((instance) => {
      const position = instance.config?.position ?? 'undefined';
      const existingInstances = result.get(position);
      const updatedInstances = existingInstances ? [...existingInstances, instance] : [instance];

      result.set(position, updatedInstances);
    });

    return Array.from(result);
  }

  private mergeConfig(instance: NotificationData): Required<NotificationData> {
    instance.config = { ...NOTIFICATION_DEFAULT_CONFIG, ...instance.config };

    return instance as Required<NotificationData>;
  }
}
