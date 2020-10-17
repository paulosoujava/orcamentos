-- name: createGenreic
INSERT INTO generic (nome, email, telefone, cidade, uf, obs, endereco, cpfCnpj)
VALUES (:nome,  :email, :telefone, :cidade, :uf, :obs, :endereco, :cpfCnpj);

-- name: checkByEmail
SELECT * FROM orcamento.generic WHERE email = :email;

-- name: checkById
SELECT * FROM orcamento.generic WHERE idGeneric = :id;

-- name: updateByEmail
UPDATE generic
SET nome = :nome,  telefone= :telefone, cidade= :cidade, uf= :uf, obs= :obs, endereco= :endereco, cpfCnpj= :cpfCnpj
WHERE  email = :email;

--name: deleteGeneric
DELETE  FROM orcamento.generic WHERE idGeneric = :id;

--name: getAll
SELECT * FROM orcamento.generic

--name: getLastOcrPed
SELECT * FROM orcamento.orcPed  ORDER BY idOrcPed DESC LIMIT 1

--name: countOcrPed
SELECT count(idGeneric) FROM orcamento.orcPed WHERE idGeneric = :id

--name: getOne
SELECT * FROM orcamento.generic WHERE email = :email

--name: getAllOcrPed
SELECT * FROM orcamento.orcPed WHERE idGeneric = :id

--name: createOrcPed
INSERT INTO orcPed (idOrcPed, tipo, localEntrega, validade, criacao, quantidadeItens, valorTotal, obs, idGeneric, situacao )
VALUES (:idOrcPed, :tipo,  :localEntrega, :validade, :criacao, :quantidadeItens, :valorTotal, :obs, :idGeneric, :situacao);

-- name: checkByIdInOrcPed
SELECT * FROM orcamento.orcPed WHERE idOrcPed = :id;

-- name: updateOrcPed
UPDATE orcamento.orcPed
SET tipo = :tipo,  localEntrega= :localEntrega, validade= :validade,  obs= :obs, situacao= :situacao, idOrcPed = :idOrcPed
WHERE  idOrcPed = :id;

--name: deleteOrcPed
DELETE  FROM orcamento.orcPed WHERE idOrcPed = :id;

--name: createOrcPedItem
INSERT INTO orcPedItem (descricao, valorUnitario, quantidade,   valorTotal, obs, idOrcPed)
VALUES (:descricao,  :valorUnitario, :quantidade,   :valorTotal, :obs, :idOrcPed);

-- name: checkByIdInOrcPedItem
SELECT * FROM orcamento.orcPedItem WHERE idOrcPedItem = :id;

--name: getLastItemsOcrPed
SELECT * FROM orcamento.orcPedItem WHERE idOrcPed = :id;

-- name: updateOrcPedItem
UPDATE orcamento.orcPedItem
SET descricao = :descricao,  valorUnitario= :valorUnitario, quantidade= :quantidade, valorTotal= :valorTotal, valorTotal= :valorTotal, obs= :obs
WHERE  idOrcPedItem = :id;

--name: deleteOrcPedItem
DELETE  FROM orcamento.orcPedItem WHERE idOrcPedItem = :id;

-- name: getAllItemsOrcPedThisIdOrcPed
SELECT * FROM orcamento.orcPedItem WHERE idOrcPed = :id ORDER BY idOrcPedItem Desc;

-- name: createHeader
INSERT INTO header ( nome, endereco, telefone, email, cnpj)
VALUES (:nome,  :endereco, :telefone,  :email, :cnpj);

-- name: createFooter
INSERT INTO footer ( nome, telefone, email )
VALUES (:nome,  :telefone,  :email );

--name: getHeader
SELECT * FROM orcamento.header LIMIT 1;

--name: getFooter
SELECT * FROM orcamento.footer LIMIT 1;

--name: checkHeaderByEmail
SELECT * FROM orcamento.header WHERE email = :email;

--name: checkFooterByEmail
SELECT * FROM orcamento.footer WHERE email = :email;

--name: updateHeader
UPDATE orcamento.header
SET nome = :nome,  email= :email, telefone= :telefone, cnpj= :cnpj, endereco= :endereco
WHERE  idheader = :id;

--name: updateFooter
UPDATE orcamento.footer
SET nome = :nome,  email= :email, telefone= :telefone
WHERE  idFooter = :id;