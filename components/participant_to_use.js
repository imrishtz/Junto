// const getParticipantNameFromPhone = (participantPhones) => {
//   const contactMatched = contacts.find(
//       (contact) =>  {
//         for (const contactPhone of contact.phoneNumbers) {
//           for (const participantPhone of participantPhones) {
//             if (participantPhone === contactPhone) {
//               return contact;
//             }
//           }
//         }
//       } 
//     );
//   return contactMatched && contactMatched.firstName;

//   const selectParticipantDisplayName = (participant) => {
//     let name = participant.phoneNumbers[0];
//     if (participant.phoneNumbers[0] === user.phoneNumber) {
//       name = 'You';
//     } else if (participant.name !== undefined) {
//       name = participant.name;
//     } else if (participant.userName !== undefined) {
//       name = participant.userName;
//     }
//     return name;
//   }
//   const { name,
//     date,
//     location,
//     participants,
//     type,
//     icon,
//   } = props.event;

// }

// const participantsWithInfo = participants && participants.length > 0 ? participants.map((participant) => {
//   const name = getParticipantNameFromPhone(participant.phoneNumbers);
//   if (name !== undefined) {
//     return ({
//       ...participant,
//       name: getParticipantNameFromPhone(participant.phoneNumbers)
//     });
//   } else {
//     return participant;
//   }
// }) : [];
