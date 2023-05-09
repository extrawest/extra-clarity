import { ChangeDetectionStrategy, Component } from '@angular/core';
import { groupBy, toPairs } from 'lodash';
import { BehaviorSubject, map } from 'rxjs';

import { NOTIFICATION_DEFAULT_CONFIG } from '../../constants';
import { NotificationData } from '../../typings';

@Component({
  selector: 'ec-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationContainerComponent {
  readonly instances$ = new BehaviorSubject<Required<NotificationData[]>>([]);
  readonly groupedInstances$ = this.instances$.pipe(
    map((instances) => toPairs(groupBy(instances, 'config.position'))),
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

  private mergeConfig(instance: NotificationData): Required<NotificationData> {
    instance.config = { ...NOTIFICATION_DEFAULT_CONFIG, ...instance.config };

    return instance as Required<NotificationData>;
  }
}
