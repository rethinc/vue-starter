import { SelectedExample } from './SelectedExample'

interface SelectedExampleMessage {
  type: 'SelectedExampleMessage'
  selectedExample: SelectedExample
}

interface ExampleViewMountedMessage {
  type: 'ExampleViewMountedMessage'
}

interface ExampleViewUnmountedMessage {
  type: 'ExampleViewUnmountedMessage'
}

export type ViewExamplesMessage =
  | SelectedExampleMessage
  | ExampleViewMountedMessage
  | ExampleViewUnmountedMessage

export const createSelectedExampleMessage = (
  selectedExample: SelectedExample
): SelectedExampleMessage => {
  return {
    type: 'SelectedExampleMessage',
    selectedExample: { ...selectedExample },
  }
}

export const createExampleViewMountedMessage =
  (): ExampleViewMountedMessage => {
    return { type: 'ExampleViewMountedMessage' }
  }

export const createExampleViewUnmountedMessage =
  (): ExampleViewUnmountedMessage => {
    return { type: 'ExampleViewUnmountedMessage' }
  }
