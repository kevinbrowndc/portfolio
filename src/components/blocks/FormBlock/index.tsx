import * as React from 'react';
import classNames from 'classnames';

import { getComponent } from '../../components-registry';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import SubmitButtonFormControl from './SubmitButtonFormControl';

export default function FormBlock(props) {
    const formRef = React.createRef<HTMLFormElement>();
    const { fields = [], elementId, submitButton, className, styles = {}, 'data-sb-field-path': fieldPath } = props;

    if (fields.length === 0) {
        return null;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(formRef.current);
        const value = Object.fromEntries(data.entries());
        alert(`Form data: ${JSON.stringify(value)}`);
    }

    return (
         <form method="post">
            <input id="csrf_token" name="csrf_token" type="hidden" value="ImRlYTVlMDRiNDgwMTQyMzBjZjM4ZTM0Y2NkZWQxOTRjMWM1YjI2NzUi.YF9cuQ.CPIoOJq1ZTtTDR9j98h1Kab9fk8">
            <label for="first_name">First Name </label><input id="first_name" name="first_name" required type="text" value="">
            <br><br>

            <label for="last_name">Last Name  </label><input id="last_name" name="last_name" required type="text" value="">
            <br><br>

            <label for="email">Email      </label><input id="email" name="email" required type="text" value="">
            <br><br>


            <label for="tel">Telephone  </label><input id="tel" name="tel" required type="text" value="">
            <br><br>

            <label for="country">Country    </label><input id="country" name="country" required type="text" value="">
            <br><br>

            <label for="message">Message    </label><textarea id="message" name="message" required></textarea>
            <br>

            <input id="submit" name="submit" type="submit" value="Submit">
        </form>

                        
        
        <form 
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-form-block',
                className,
                styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined,
                styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : undefined,
                styles?.self?.borderWidth && styles?.self?.borderWidth !== 0 && styles?.self?.borderStyle !== 'none'
                    ? mapStyles({
                          borderWidth: styles?.self?.borderWidth,
                          borderStyle: styles?.self?.borderStyle,
                          borderColor: styles?.self?.borderColor ?? 'border-primary'
                      })
                    : undefined,
                styles?.self?.borderRadius ? mapStyles({ borderRadius: styles?.self?.borderRadius }) : undefined
            )}
            name={elementId}
            id={elementId}
            onSubmit={handleSubmit}
            ref={formRef}
            data-sb-field-path= {fieldPath}
        >
            <div
                className={classNames('w-full', 'flex', 'flex-wrap', 'gap-8', mapStyles({ justifyContent: styles?.self?.justifyContent ?? 'flex-start' }))}
                {...(fieldPath && { 'data-sb-field-path': '.fields' })}
            >
                <input type="hidden" name="form-name" value={elementId} />
                {fields.map((field, index) => {
                    const modelName = field.__metadata.modelName;
                    if (!modelName) {
                        throw new Error(`form field does not have the 'modelName' property`);
                    }
                    const FormControl = getComponent(modelName);
                    if (!FormControl) {
                        throw new Error(`no component matching the form field model name: ${modelName}`);
                    }
                    return <FormControl key={index} {...field} {...(fieldPath && { 'data-sb-field-path': `.${index}` })} />;
                })}
            </div>
            {submitButton && (
                <div className={classNames('mt-8', 'flex', mapStyles({ justifyContent: styles?.self?.justifyContent ?? 'flex-start' }))}>
                    <SubmitButtonFormControl {...submitButton} {...(fieldPath && { 'data-sb-field-path': '.submitButton' })} />
                </div>
            )}
        </form>
    );
}
