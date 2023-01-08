// isAdmin = (req, res, next) => {
//     User.findByPk(req.userId).then(user => {
//       user.getRoles().then(roles => {
//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "admin") {
//             next();
//             return;
//           }
//         }
//         res.status(403).send({
//           message: "Require Admin Role!"
//         });
//         return;
//       });
//     });
//   };
//   isModerator = (req, res, next) => {
//     User.findByPk(req.userId).then(user => {
//       user.getRoles().then(roles => {
//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "moderator") {
//             next();
//             return;
//           }
//         }
//         res.status(403).send({
//           message: "Require Moderator Role!"
//         });
//       });
//     });
//   };
//   isModeratorOrAdmin = (req, res, next) => {
//     User.findByPk(req.userId).then(user => {
//       user.getRoles().then(roles => {
//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "moderator") {
//             next();
//             return;
//           }
//           if (roles[i].name === "admin") {
//             next();
//             return;
//           }
//         }
//         res.status(403).send({
//           message: "Require Moderator or Admin Role!"
//         });
//       });
//     });
//   };