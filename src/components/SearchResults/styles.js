import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginTop: 30,
    },
    scrollView: {
        maxHeight: 200,
        width: '100%',
    },
    resultsHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 5,
    },
    cityContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    city: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: 'blue',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 5,
    },
});
export default styles;