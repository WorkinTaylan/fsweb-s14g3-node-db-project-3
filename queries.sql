-- Multi-Table Sorgu Pratiği

-- Tüm ürünler(product) için veritabanındaki ProductName ve CategoryName'i listeleyin. (77 kayıt göstermeli)
SELECT p.ProductName, c.CategoryName
From  Product p
Inner Join Category c on p.CategoryId=c.Id
-- 9 Ağustos 2012 öncesi verilmiş tüm siparişleri(order) için sipariş id'si (Id) ve gönderici şirket adını(CompanyName)'i listeleyin. (429 kayıt göstermeli)
Select o.Id, c.CompanyName from [Order]as o Inner Join Customer as c on o.CustomerId=c.Id  where OrderDate<[2012-08-09]
-- Id'si 10251 olan siparişte verilen tüm ürünlerin(product) sayısını ve adını listeleyin. ProdcutName'e göre sıralayın. (3 kayıt göstermeli)
select count(ProductName) as "Product Number",P.ProductName from OrderDetail od
join Product p on od.ProductId = p.Id
where OrderId=10251
group by ProductName
order by p.ProductName
-- Her sipariş için OrderId, Müşteri'nin adını(Company Name) ve çalışanın soyadını(employee's LastName). Her sütun başlığı doğru bir şekilde isimlendirilmeli. (16.789 kayıt göstermeli)
Select o.Id, c.CompanyName, e.LastName from [Order] as o Join Customer as c on o.CustomerId = c.Id Join Employee as e on o.EmployeeId=e.Id