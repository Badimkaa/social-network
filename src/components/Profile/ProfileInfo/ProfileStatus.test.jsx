import TestRenderer from "react-test-renderer"
import ProfileStatus from "./ProfileStatusWithHooks"

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = TestRenderer.create(<ProfileStatus status='i am a status' />)
        const instance = component.getInstance()
        expect(instance.state.status).toBe('i am a status')
    })
    test('span, no input', () => {
        const component = TestRenderer.create(<ProfileStatus status='i am a status' />)
        const root = component.root
        let span = root.findByType('span')
        expect(span).not.toBeNull()
    })
    test('no input', () => {
        const component = TestRenderer.create(<ProfileStatus status='i am a status' />)
        const root = component.root

        expect(() => {
            let input = root.findByType('input')
        }).toThrow()
    })
    test('input should be displayed in edit mode instead of span', () => {
        const component = TestRenderer.create(<ProfileStatus status='i am a status' />)
        const root = component.root
        let span = root.findByType('span')
        span.props.onClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('i am a status')
    })
    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = TestRenderer.create(<ProfileStatus status='i am a status' updateStatus={mockCallback}/>)
        const instance = component.getInstance()
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})