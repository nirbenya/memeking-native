import React from 'react';
import { View } from 'react-native';
import Text from '../../components/Text/Text';
import Colors from '../../constants/Colors';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import config from '../../config/config';

const BugsPage = () => {
	const [message, setMessage] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [name, setName] = React.useState('');

	const onSubmit = async () => {
		const res = await fetch(`${config.apiBaseUrl}/user-report`, {
			method: 'POST',
			body: JSON.stringify({ message, name, email, id: new Date().getTime() }),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
		});

		if (res.ok) {
			setMessage('');
			setName('');
			setEmail('');
			alert('קיבלנו, תודה!');
		} else {
			alert('משהו השתבש');
		}
	};

	return (
		<View style={{ backgroundColor: Colors.brand, flex: 1, alignItems: 'center' }}>
			<View style={{ marginTop: 24, alignItems: 'center' }}>
				<Text variant={'white'} style={{ textAlign: 'center' }} size={'xl'}>
					דיווחים על באגים ובקשות לשיפורים
				</Text>
				<Text variant={'white'} style={{ textAlign: 'center', marginTop: 16 }}>
					ניתן לשלוח הודעה דרך הטופס או במייל: nirbenya@gmail.com
				</Text>
				<View style={{ marginTop: 50, flex: 1, width: 350 }}>
					<View>
						<Input
							value={name}
							variant={'normal'}
							onChange={name => setName(name)}
							placeholder={'שם (אופציונאלי)'}
						/>
					</View>
					<View style={{ marginTop: 8 }}>
						<Input
							value={email}
							variant={'normal'}
							onChange={email => setEmail(email)}
							placeholder={'אי-מייל (אופציונאלי)'}
						/>
					</View>
					<View style={{ marginTop: 8, marginBottom: 24 }}>
						<Input
							blurOnSubmit
							numberOfLines={3}
							multiline
							variant={'normal'}
							value={message}
							size={'xl'}
							onChange={message => setMessage(message)}
							placeholder={'הודעה'}
						/>
					</View>

					<View>
						<Button onPress={onSubmit} variant={'secondary'} disabled={!message}>
							שליחה
						</Button>
					</View>
					<View style={{ marginTop: 'auto', marginBottom: 16 }}>
						<Text variant={'white'}>v10</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default BugsPage;
